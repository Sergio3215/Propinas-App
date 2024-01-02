import { useRouter } from "next/router";

export default function siteName(){

    const router = useRouter();

    const {siteName} = router.query;

    return(
        <div>
        {siteName}
        </div>
    )

}