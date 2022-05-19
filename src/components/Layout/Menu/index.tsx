import {MenuItems} from "./MenuItems";
import NextLink from "next/link"
import {Button} from "@mui/material";

const MenuList = ():JSX.Element => {
    return <>
        {
            MenuItems.map((item, index:number) => {
                return <NextLink key={index} href={item.url} passHref>
                    <Button variant="contained" sx={{ml:1,mr:1}}>
                        {item.title}
                    </Button>
                </NextLink>
            })
        }
    </>
}

export default MenuList;