//antd
import difference from "lodash/difference";
import { Transfer, Table, Tag } from 'antd';
//React
import React, { useState } from "react";

//Redux
import { connect } from "react-redux";
import { readCard } from "../../Redux/Reducers/CardsReducer";
import { readAllDishes } from "../../Redux/Reducers/DishesReducer"; 
import { editCard } from "../../Redux/Actions/CardsActions";

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
    dataIndex: 'categoria',
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
        dataIndex: 'categoria',
        title: 'Categoría',
        render: tag => <Tag>{tag}</Tag>,
      }
];

const EditCardForm = ({ users, techs, project, editCard, card, dishes}) => {

  const rightDishes = dishes.filter(dish => {
    return card.platos.map(pc => {return pc.id}).includes(dish.id)
  });

  const rightDishesKey = rightDishes.map(dish => {return dish.key})


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
    
  

  const [state, setState] = useState({
    targetKeys: rightDishesKey,
    disabled: false,
    showSearch: false,
  });

  const { targetKeys } = state;

  const onChanged = (nextTargetKeys) => {
    setState({ targetKeys: nextTargetKeys });

    card.platos=dishes.filter(dish => {
      return nextTargetKeys.includes(dish.id.toString())
    });
    
    editCard(card);
  };

  console.log(dishes);

  return (
    <div className="transferTableUsersTechs">
        <TableTransfer
          dataSource={dishes}
          targetKeys={targetKeys}
          disabled={false}
          showSearch={true}
          onChange={onChanged}
          filterOption={(inputValue, item) =>
            {
          
              return item.titulo.indexOf(inputValue) !== -1 || item.categoria.indexOf(inputValue) !== -1}
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { card: readCard(state), dishes: readAllDishes(state)/*, project: readProject(state) */};
};

export default connect(mapStateToProps,{editCard})(EditCardForm);
