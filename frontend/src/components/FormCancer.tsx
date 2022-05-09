import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import './FormCancer.css'

const FormCancer = () => {
  const [predicction, setPredicction] = useState(-1);

  return (
    <>
      <h1 className="titulo">Eligibilidad de Pacientes con Cancer</h1>
      <Formik
        initialValues={{
          study_and_condition: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          let requestOptions = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          };
          fetch("http://127.0.0.1:8000/predict", requestOptions)
            .then((resp) => resp.json())
            .then((d) => {
              console.log(d.score)
              setPredicction(d.score);
            });
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="contenido">
            <Field className="input" placeholder="studies and conditions" as="textarea" rows="3" name="study_and_condition" />
            <button className="color" type="submit">
              Predecir
            </button>
          </Form>
        )}
      </Formik>

      {predicction !== -1 && <h2 className="respuesta">{predicction === 1 ? "El paciente es candidato para ensayos clinicos de cancer." : "El paciente no es candidato para ensayos clinicos."}</h2>}
    </>
  );
};

export default FormCancer;
