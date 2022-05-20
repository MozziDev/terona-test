import type { NextPage } from 'next'
import { Container, Grid} from "@mui/material";
import {IBedding} from "../src/interface/iBedding";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EuroIcon from '@mui/icons-material/Euro';

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


const Home = ({beddings}: IBedding[]) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let allBeddings: JSX.Element;
  if (beddings.length) {
    allBeddings = beddings.map((bedding: IBedding)=>{
      return <Grid key={bedding.id} item xs={3}>
                <Card key={bedding.id} sx={{ maxWidth: 345 }}>
                  <CardHeader
                      title={bedding.title}
                      subheader="September 14, 2016"
                  />
                  <CardMedia
                      component="img"
                      height="194"
                      image={bedding.image}
                      alt={bedding.title}
                  />
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
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
        <Container fixed  maxWidth="xl">
        <Grid container spacing={2} sx={{pt: 2, width:'100%'}} alignItems={'center'} alignContent={'center'}>
                {allBeddings}
        </Grid>
        </Container>
      </>
  )
}

export async function getStaticProps() {
  const urlBed:string = process.env.DOMAIN_NAME+'/api/get-bedding';

  const res = await fetch(urlBed)
  const beddings: IBedding[] = await res.json()

  return {
    props: {
      beddings,
    },
  }
}

export default Home
