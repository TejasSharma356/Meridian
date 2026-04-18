'use server';

import dbConnect from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import { getSession } from '@/lib/auth';

export async function fetchPortfolioConfig() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session || !session.userId) {
      return { success: false, error: "Unauthorized session" };
    }

    const portfolio = await Portfolio.findOne({ userId: session.userId }).lean();
    if (portfolio) {
      // Stringify -> Parse to send lean object across Server action boundary safely
      return { success: true, data: JSON.parse(JSON.stringify(portfolio)) };
    }
    
    return { success: true, data: null };
  } catch (error: any) {
    console.error('Error fetching portfolio:', error);
    return { success: false, error: error.message };
  }
}

export async function savePortfolioConfig(payload: any) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session || !session.userId) {
      return { success: false, error: "Unauthorized session" };
    }

    // Isolate payload components to prevent over-writing _id and userId
    const updateData = {
      name: payload.name,
      title: payload.title,
      summary: payload.summary,
      skills: payload.skills,
      experience: payload.experience,
      education: payload.education,
      projects: payload.projects,
      customSections: payload.customSections
    };

    await Portfolio.findOneAndUpdate(
      { userId: session.userId },
      { $set: updateData },
      { upsert: true, new: true }
    );

    return { success: true };
  } catch (error: any) {
    console.error('Error saving portfolio:', error);
    return { success: false, error: error.message };
  }
}
