const {tableController} = require('./tables.controller');
let  accepted = {accepted:false};
module.exports = (io) => {


    const tableCtrl = tableController(io);

    io.on('connect',(socket)=>{
        socket.on('joinTable', (dish) =>{
            //console.log(dish);
            tableCtrl.joinTable(dish);
        });

    //console.log(accepted);

        socket.on('acceptTable',(waiterAccepts) => {

            accepted.accepted = waiterAccepts;

        });


        setInterval(()=>{
            let acceptid = tableCtrl.acceptedTable();
            console.log(accepted);
            socket.emit('acceptedTable',accepted );
        },1000)

        
    });
}