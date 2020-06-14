//antd
import difference from "lodash/difference";
import { Transfer, Table, Tag, Badge } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
//React
import React, { useState } from "react";
import './Delivery.css';
//Redux
import { connect } from "react-redux";
import { readCard } from "../../Redux/Reducers/CardsReducer";
import { readAllDishes } from "../../Redux/Reducers/DishesReducer"; 
import { editCard } from "../../Redux/Actions/CardsActions";

//Esto es la tabla y cómo se rellena
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  
  <Transfer {...restProps} className="tabla" showSelectAll={false}>
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
          className="tabla"
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
const addDish = (e)=>{
console.log(e);
};
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
    render: tag => <React.Fragment><Tag>{tag}</Tag> </React.Fragment>,
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
        dataIndex: 'cantidad',
        title: 'Cantidad',
        render: tag => <React.Fragment><MinusOutlined onClick={(e)=>{console.log(e)}}/> {tag} <PlusOutlined onClick={addDish}/></React.Fragment>,
      }
];

const Delivery = ({ editCard, card, dishes}) => {


  const rightDishes = dishes.filter(dish => {
    return card.platos.map(pc => {return pc.id}).includes(dish.id)
  });

  const rightDishesKey = rightDishes.map(dish => {return dish.id})

  const [state, setState] = useState({
    targetKeys: rightDishesKey,
    disabled: false,
    showSearch: false,
  });

  const { targetKeys } = state;

  const onChanged = (nextTargetKeys) => {
    setState({ targetKeys: nextTargetKeys });

    console.log(nextTargetKeys);

    card.platos=dishes.filter(dish => {
      return nextTargetKeys.includes(dish.id)
    });
    
    editCard(card);
  };

  console.log(dishes);

  return (
    <div className="transferTableDishes">
      <div className="titleCard"><img style={{width:50}} src={require("../../img/beer.svg")}/> {card.nombre} <img style={{width:50}} src={require("../../img/beer.svg")}/></div>
        <TableTransfer
          dataSource={dishes}
          targetKeys={targetKeys}
          disabled={false}
          showSearch={true}
          onChange={onChanged}
          filterOption={(inputValue, item) => {
          
            return item.titulo.indexOf(inputValue) !== -1 || item.categoria.indexOf(inputValue) !== -1}
            
          }
          onClick = {(e)=>{
            console.log(e);
          }}
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { card: readCard(state), dishes: readAllDishes(state)/*, project: readProject(state) */};
};

export default connect(mapStateToProps,{editCard})(Delivery);
