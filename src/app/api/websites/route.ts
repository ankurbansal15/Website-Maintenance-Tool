import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import Website from "../../../lib/models/WebsiteSchema"; // Adjust the import path as necessary
import connectToDatabase from "../../../lib/mongodb";

export async function POST(request: NextRequest) {


  try {
    const { url,username } = await request.json();
    console.log(url);
    
    const response = await axios.get(url);

    if (response.status !== 200) {
      return NextResponse.json(
        {
          status: false,
          message: `Website at URL ${url} is not active`,
        },
        { status: 422 }
      );
    }

    const newWebsite = new Website({
        url,
        username,
        isActive: true,
    });

    const savedWebsite = await newWebsite.save();

    return NextResponse.json(
      {
        status: true,
        message: "Website created successfully",
        data: savedWebsite,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function GET(request:NextRequest) {

  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { status: false, message: "Username is required" },
        { status: 400 }
      );
    }

    const websites = await Website.find({ username });
    console.log(websites);
    
    return NextResponse.json(
      {
        status: true,
        message: "Websites fetched successfully",
        data: websites,
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { status: false, message: "An error occurred", error: (error as any).message },
      { status: 501 }
    );
  }
}
