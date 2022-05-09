import React, { useState } from "react";
import { Field, Form, Formik } from "formik";

const FormCancer = () => {
  const [predicction, setPredicction] = useState(0);

  return (
    <>
      <Formik
        initialValues={{
          texto: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setPredicction(1);
          console.log(values);
          let requestOptions = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...values }),
          };
          fetch("http://???", requestOptions)
            .then((resp) => resp.json())
            .then((d) => {
              setPredicction(1);
            });
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Field placeholder="studies ..." type="textarea" name="texto" />
            <button className="color" type="submit">
              Predecir
            </button>
          </Form>
        )}
      </Formik>

      <h1>{predicction ? "si" : "no"}</h1>
    </>
  );
};

export default FormCancer;
