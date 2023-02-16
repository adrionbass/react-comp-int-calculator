import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import Container from "./components/Container.jsx";
import Section from "./components/Section.jsx";
import Input from "./components/Input.jsx";
import Button from "./components/Button.jsx";
import Balance from "./components/Balance.jsx";

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1);
  }
  return Math.round(total);
};

const formatter = new Intl.NumberFormat('en-US',{
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(
      Number(deposit),
      Number(contribution),
      Number(years),
      Number(rate)
    );
    setBalance(formatter.format(val))
  };
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: "",
            contribution: "",
            years: "",
            rate: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number().required('Obligatorio').typeError('Debe ingresar un número'),
            contribution: Yup.number().required('Obligatorio').typeError('Debe ingresar un número'),
            years: Yup.number().required('Obligatorio').typeError('Debe ingresar un número').min(1, 'El valor mínimo es 1'),
            rate: Yup.number().required('Obligatorio').typeError('Debe ingresar un número').min(0, 'El valor mínimo es 0').max(1, 'El valor máximo es 1'),
          })}
        >
          <Form>
            <Input name="deposit" label="Depósito inicial" />
            <Input name="contribution" label="Depósito mensual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interés estimado" />
            <Button>Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Balance Final: {balance}</Balance> : null}
      </Section>
    </Container>
  );
}

export default App;
