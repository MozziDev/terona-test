import {MenuItems} from "./MenuItems";
import NextLink from "next/link"
import {Button} from "@mui/material";
import {connect} from "react-redux";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const MenuList = ({wallet, user}: any):JSX.Element => {
    return <>
        {
            MenuItems.map((item, index:number) => {
                const endIcon = (item.title === 'Profile' && user.name === '' )? <PriorityHighIcon sx={{color: 'red'}} />  : <></>;
                return <NextLink key={index} href={item.url} passHref>
                    {(item.private )? (wallet.isConnect)?
                            <Button variant="contained" endIcon={endIcon} sx={{ml:1,mr:1}}>
                                {item.title}
                            </Button>
                            :
                            <></>
                        :
                        <Button variant="contained" sx={{ml:1,mr:1}}>
                            {item.title}
                        </Button>
                    }
                </NextLink>
            })
        }
    </>
}

const walletStateToProps = function(state:any) {
    return {
        wallet: state.wallet,
        user:state.user
    }
}

export default connect(walletStateToProps)(MenuList);
