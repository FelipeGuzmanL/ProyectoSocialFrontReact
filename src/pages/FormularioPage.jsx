import React from "react";
import TextInput from "../components/TextInput";
import { useForm } from "react-hook-form";
import '../styles/FormularioPage.css';
import SelectInput from "../components/SelectInput";
import Solicitudes from '../components/getSolicitudes';

const FormularioPages = () => {
    const { register, watch } = useForm();
    const selectedDate = watch('fecha');
    const apellidoPaterno = watch('apellidoPaterno');
    const selectedRegion = watch('region');

    const regiones = [1,2,3,4];

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            fecha: selectedDate,
            apellido: apellidoPaterno
        };

        // console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="FormularioPage">
            <TextInput
                id="fecha"
                label="Fecha"
                type="date"
                {...register('fecha')}
            />
            <SelectInput 
                id="region"
                label="Regiones"
                options={regiones}
                valueKey="dpt_codigo"
                labelKey="dpt_descripcion"
                {...register('region')}
            />
            <TextInput id="apellidoPaterno" label="Apellido Paterno" {...register('apellidoPaterno')} />
            <Solicitudes/>
            <button type="submit">Registrar Cita</button>
        </form>
    );
}

export default FormularioPages;