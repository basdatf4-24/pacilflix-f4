import type {LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {json, useLoaderData} from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export function loader({request} : LoaderFunctionArgs) {
    const url = new URL(request.url)
    const name_param = url.searchParams.get("name")

    const name = name_param || "Basdat F4"
    return json({
        messages: `Hello from ${name}!`,
    })
}

export default function Index() {
    const data = useLoaderData<typeof loader>()
    return (
        <div className='flex justify-center w-full'>
            {data.messages}
        </div>

    );
}
