import { NextResponse } from 'next/server';
import CARegModel from "@/models/caRegModel";
import CA from "@/models/caModel";
import { sendCAEmail } from '@/utils/emailUtils';
import { hashPassword } from '@/utils/authUtils';
import { connect } from "@/dbconfig/dbConfig";

export async function GET(request: Request) {
    try {
        
        await connect();

        const data = await CARegModel.find({}).lean();

        const data2 = await CA.find({}).lean();

        const CAdata = data.map((user: any) => ({
            ...user,
            status: user.status || "pending", 
        }));

        const CAdata2 = data2.map((user: any) => ({
            ...user,
            status: user.status || "active", 
        }));

        CAdata.push(...CAdata2);

        return NextResponse.json(CAdata, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {

        await connect();

        const body = await request.json();
        const { id } = body;

        const user = await CARegModel.findById(id);

        if (!user) {
            return NextResponse.json({ error: 'CA not found' }, { status: 404 });
        }

        const { firstName, lastName , caId , email } = user;
        const password = Math.floor(100000 + Math.random() * 900000).toString();

        console.log(password);

        const hashedPassword = await hashPassword(password);

        const newCA = new CA({
            name: `${firstName} ${lastName}`,
            email: email,
            caid: caId,
            password: hashedPassword,
        });

        await newCA.save();

        await sendCAEmail(email, caId, password);

        await CARegModel.findByIdAndDelete(id);

        const response = {
            message: 'CA account created successfully',
            caId,
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}