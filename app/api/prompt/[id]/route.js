import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {
    try{
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt){
            return new Response("Prompt not found", { status: 404 })
        }
        return new Response(JSON.stringify(prompt),{
            status: 200,
        })
    }
    catch(err) {
        return new Response("Failed to fetch Prompts",{
            status: 500,
        })
    }
}


export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();

    try{
        await connectToDB();
        const exisitingPrompt = await Prompt.findById(params.id);

        if(!exisitingPrompt){
            return new Response("Prompt not found", { status: 404 })
        }
        exisitingPrompt.prompt = prompt;
        exisitingPrompt.tag = tag;

        await exisitingPrompt.save();

        return new Response(JSON.stringify(exisitingPrompt),{
            status: 200,
        })
    }
    catch(err) {
        return new Response("Failed to Update Prompt",{
            status: 500,
        })
    }
}

export const DELETE = async ( req, { params }) => {
    try{
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 })
    }
    catch(err){
        return new Response("Failed to delete Prompt", { status:500})
    }
}