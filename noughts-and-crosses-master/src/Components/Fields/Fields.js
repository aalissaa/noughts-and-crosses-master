import React from "react";
import Field from './Field/Field';
import './Fields.css';

const fields = props => {
  return (
    <div className="Fields" disabled = {props.disabled}>
      {props.fields.map((vet, iRow) => {
        return (
          <div className="row" key={iRow}>
            {vet.map((num, iCol) => {
              return (
                <Field
                  symbol={num}
                  key={iCol}
                  click={() => props.click({ row: iRow, col: iCol })}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default fields;