import Deductions from "@/models/inputDetails/deductionsModel";
import {connect} from "@/dbconfig/dbConfig";
import { NextRequest } from "next/server";

export async function POST(request : NextRequest) {
    try {
        await connect();
    const {section80EEA, section80EEB, section80G, section80GG, section80GGA, section80GGC, section80TTA, section80TTB, section80U, completed, progress} = await request.json;
    const deductions = new Deductions({
        section80EEA,
        section80EEB,
        section80G,
        section80GG,
        section80GGA,
        section80GGC,
        section80TTA,
        section80TTB,
        section80U,
        completed,
        progress,
    });
    
    await deductions.save();
    return {status: 200, data: deductions};
    } catch (error) {
        
    }
    
}