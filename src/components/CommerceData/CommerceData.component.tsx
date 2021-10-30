import { CommerceDataStyled } from './CommerceData.style';
import { CommerceData } from 'models/Commerce';

type Props = {
	data: CommerceData;
};

const CommerceDataComponent = ({ data }: Props) => {
    let { name, ruc, city, address, email, rubro } = data;
    address = null;
    return (
        <CommerceDataStyled>
            <div className="commerce-data-flex">
                {rubro ?
                <div className="commdata-item short">
                    <label className="bold">Rubro</label>
                    <h4 className="">{rubro}</h4>
                </div>
                : null}
                {name ?
                <div className="commdata-item long">
                    <label className="bold">Nombre de la empresa</label>
                    <h4 className="">{name}</h4>
                </div>
                : null}
                {ruc ?
                <div className="commdata-item short">
                    <label className="bold">Ruc</label>
                    <h4 className="">{ruc}</h4>
                </div>
                : null}
                {city ?
                <div className="commdata-item long">
                    <label className="bold">Ciudad</label>
                    <h4 className="">{city}</h4>
                </div>
                : null }
            </div>
            {address ?
            <div className="commdata-item">
                <label className="bold">Dirección</label>
                <h4 className="">{address}</h4>
            </div>
            : null }
            {email ?
            <div className="commdata-item">
                <label className="bold">Correo electrónico</label>
                <h4 className="">{email}</h4>
            </div>
            : null }
        </CommerceDataStyled>
    )
}

export default CommerceDataComponent;
