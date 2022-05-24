import type { NextPage } from 'next'
import {Container, Grid, Rating} from "@mui/material";
import {IBedding} from "../src/interface/iBedding";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EuroIcon from '@mui/icons-material/Euro';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Link from "next/link";
import {connect} from "react-redux";
import {IResultQuery} from "../src/interface/iResultQuery";
import {toast} from "react-toastify";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const Home = ({beddings, wallet}: any) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async (id: number | undefined) => {
      await fetch('/api/delete-bedding', {
              method: 'DELETE',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
                  'Content-Type': 'application/text'
              },

              body: JSON.stringify({id})
          }
      ).then(resp=>resp.json()).then((data:IResultQuery)=> {
          (data.status)? toast.success(data.text, {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                  }
              )
              :
              toast.error(data.text, {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });
          window.location.reload();
      })
  }
  let allBeddings: JSX.Element;
  if (beddings.length) {
    allBeddings = beddings.map((bedding: IBedding)=>{
      return <Grid key={bedding.id} item xs={3}>
                <Card key={bedding.id} sx={{ maxWidth: 345 }}>
                  <CardHeader
                      title={<Link href={"/detail/"+bedding.id}>{bedding.title}</Link>}

                      action={<>
                      <Link href={"/detail/"+bedding.id}>
                          <IconButton aria-label="share">
                              <RemoveRedEyeIcon />
                          </IconButton>
                      </Link>
                          {wallet.isConnect && (
                          <IconButton aria-label="share" onClick={()=>handleDelete(bedding.id)} >
                            <DeleteForeverIcon/>
                          </IconButton>
                              )}
                      </>
                      }
                  />
                  <CardMedia
                      component="img"
                      height="194"
                      image={bedding.image}
                      alt={bedding.title}
                  />
                  <CardActions disableSpacing sx={{mt:2}}>
                    <Rating name="size-medium" readOnly defaultValue={5} />
                    <Typography sx={{ marginLeft: 'auto', mr:1}}>
                      Price: {bedding.price}
                    </Typography>
                    <EuroIcon/>
                  </CardActions>
                </Card>
      </Grid>
    })
  }
    return (
      <>
        <Container fixed  maxWidth="xl" >
        <Grid container spacing={2} sx={{mt: 4, width:'100%'}} alignItems={'center'} alignContent={'center'}>
            {
                // @ts-ignore
                allBeddings
            }
        </Grid>
        </Container>
      </>
  )
}

export async function getServerSideProps() {
  const urlBed:string = 'https://terona-test.vercel.app/api/get-bedding';

  const res = await fetch(urlBed)
  const beddings: IBedding[] = await res.json()

  return {
    props: {
      beddings,
    },
  }
}

const walletStateToProps = function(state:any) {
    return {
        wallet: state.wallet
    }
}

export default connect(walletStateToProps)(Home);
