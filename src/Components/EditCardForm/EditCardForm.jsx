//antd
import difference from "lodash/difference";
import { Transfer, Switch, Table, Tag } from 'antd';
//React
import React, { useState } from "react";

//Redux
import { connect } from "react-redux";
import { readCard } from "../../Redux/Reducers/CardsReducer";
/*import { readAllUsers } from "../../Redux/Reducers/UserReducer";
import { readAllTechs } from "../../Redux/Reducers/TechReducer";
import { readProject } from "../../Redux/Reducers/ProjectReducer";
import { editProject } from "../../Redux/Actions/ProjectActions";
*/
//Esto es la tabla y cómo se rellena
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (

  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? "none" : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

//Contenido la tabla izquierda
const leftTableColumns = [
  {
    dataIndex: "titulo",
    title: "Titulo",
  },
  {
    dataIndex: "precio",
    title: "Precio",
  },
  {
    dataIndex: 'category',
    title: 'Categoría',
    render: tag => <Tag>{tag}</Tag>,
  }
];

//Contenido de la tabla derecha
const rightTableColumns = [
    {
        dataIndex: "titulo",
        title: "Titulo",
      },
      {
        dataIndex: "precio",
        title: "Precio",
      },
      {
        dataIndex: 'category',
        title: 'Categoría',
        render: tag => <Tag>{tag}</Tag>,
      }
];

const EditCardForm = ({ users, techs, project, editProject, card}) => {

  /*const rightTechs = techs.filter(tech => {
    return project.tecnologias.map(tp => {return tp.id}).includes(tech.id)
  });

  const rightTechsKey = rightTechs.map(tech => {return tech.key})
*/

  console.log(card);

  const mockTags = ['cat', 'dog', 'bird'];

    const mockData = [];
    for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 4 === 0,
        tag: mockTags[i % 3],
    });
    }
    
  

  /*const [state, setState] = useState({
    targetKeys: {id:1},
    disabled: false,
    showSearch: false,
  });*/

  //const { targetKeys } = state;
/*
  const onChanged = (nextTargetKeys) => {
    setState({ targetKeys: nextTargetKeys });

    project.tecnologias=techs.filter(tech => {
      return nextTargetKeys.includes(tech.id)
    });
    
    editProject(project);
  };
*/
  return (
    <div className="transferTableUsersTechs">
        <TableTransfer
          dataSource={mockData}
          targetKeys={"1","2"}
          disabled={false}
          showSearch={true}
          onChange={console.log(card)}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { card: readCard(state)/*, techs: readAllTechs(state), project: readProject(state) */};
};

export default connect(mapStateToProps,null)(EditCardForm);
