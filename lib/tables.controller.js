const model = require('../app/model/socialBar.model');

module.exports = {tableController};

function tableController(io){
    const tables = new Map();

    return{
        getDeliveryFromCard,
        joinTable,
        acceptTable,
        acceptedTable
    }

    function getDeliveryFromCard(card){

        //console.log(card);

    }

    function initTables(){
        for(let topic of TABLES_TOPICS){
            tables.set(topic, getInitialTableState(topic));
        }
    }

    function getInitialTableState(topic){
        return{
            table : 1
        }
    }

    function joinTable(dish){
        let table;
        //console.log(dish);
    }

    function acceptTable(accept){
        console.log(accept);
        acceptedTable(accept);
        
    }

    function acceptedTable(accepted){
        console.log(accepted);
        return accepted;
    }
}