import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET(req: Request) {
  try {
    // Verify admin token
    const token = req.headers.get("cookie")?.split("admin_token=")[1]?.split(";")[0];
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    jwt.verify(token, process.env.JWT_ADMIN_SECRET!);

    await dbConnect();

    // Get all bookings
    const allBookings = await Booking.find({}).sort({ createdAt: -1 });

    // Calculate stats
    const stats = {
      totalBookings: allBookings.length,
      totalRevenue: allBookings
        .filter(b => b.status === "PAID")
        .reduce((sum, b) => sum + b.amount, 0),
      ticketsSold: allBookings
        .filter(b => b.status === "PAID")
        .reduce((sum, b) => sum + b.quantity, 0),
      pendingPayments: allBookings.filter(b => b.status === "PENDING").length,
      
      // Pass-wise breakdown
      passSales: Object.entries(
        allBookings
          .filter(b => b.status === "PAID")
          .reduce((acc: any, b) => {
            if (!acc[b.passName]) {
              acc[b.passName] = { count: 0, revenue: 0 };
            }
            acc[b.passName].count += b.quantity;
            acc[b.passName].revenue += b.amount;
            return acc;
          }, {})
      ).map(([passName, data]: any) => ({
        passName,
        count: data.count,
        revenue: data.revenue,
      })),
    };

    // Get recent 10 bookings
    const recentBookings = allBookings.slice(0, 10).map(b => ({
      _id: b._id,
      reference: b.reference,
      name: b.name,
      passName: b.passName,
      quantity: b.quantity,
      amount: b.amount,
      status: b.status,
      createdAt: b.createdAt,
    }));

    return NextResponse.json({
      success: true,
      stats,
      recentBookings,
    });
  } catch (error: any) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}