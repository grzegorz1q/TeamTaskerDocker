import { Input } from "@mui/joy";
import { FormikOnChangeHandler } from "../../../Types/CommonTypes";

export default function GeneriCreateProjectInput({idName, FormikValue, FormikValueOnChange, placeholder}:
                                                 {idName: string, FormikValue: string, FormikValueOnChange: FormikOnChangeHandler, placeholder: string}
)
{

    return(
        <>
            <Input id={idName} placeholder={placeholder} sx={{minWidth: "25rem"}}
            value={FormikValue} onChange={FormikValueOnChange}
            />
        </>
    );
}