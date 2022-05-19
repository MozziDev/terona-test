import {NextPage} from "next";
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup
        .string()
        .email('Enter a valid email')
        .required('Name bedding is required'),
    size: yup
        .number()
        .required('Size is required'),
    manufacturer: yup
        .number()
        .default(0)

});

const AddBedding: NextPage = ():JSX.Element => {
    return <>

        </>
}