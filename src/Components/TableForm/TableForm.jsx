import React from "react";
import './TableForm.css';
import  QRCode from 'qrcode.react';

const TableForm = ({idTable,idCard})=>{

    console.log(idTable,idCard);

    return(
        <div>
           
            <QRCode value={`http://tacumba.es/CardFromTable/${idTable}/${idCard}`}/>
        
        </div>
    )
}

export default TableForm;