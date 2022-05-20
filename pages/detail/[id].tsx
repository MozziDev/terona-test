import {IBedding} from "../../src/interface/iBedding";

const Details = ({beddings}) => {
    return<>
        {JSON.stringify(beddings)}
    </>
}

export const getStaticPaths = async () => {
    const urlBed:string = process.env.DOMAIN_NAME+'/api/get-bedding';
    const res = await fetch(urlBed)
    const beddings: IBedding[] = await res.json()

    const paths = beddings.map((bedding: IBedding) => {
        return {
            params: { id: bedding.id.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context)=>{
    const urlBed =  process.env.DOMAIN_NAME+'/api/get-bedding-by-id?id='+context.params.id;
    const res = await fetch(urlBed)
    const beddings: IBedding = await res.json()

    return {
        props: {
            beddings
        },
    }
}

export default Details;