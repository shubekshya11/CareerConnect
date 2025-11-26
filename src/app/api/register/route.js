import pg from "@/app/lib/db";
import { NextResponse } from "next/server";
import transporter from '@/app/lib/emailConfig';
import bcrypt from 'bcryptjs';

// REGISTER User
export async function POST(request) {
    try {
        const body = await request.json();
        const { firstname, lastname, email, phone, password, confirmPassword } = body;

        //Check password match on the server
        if (password !== confirmPassword) {
            return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
        }
        // Check if user exists
        const existingUser = await pg('users').where({ email }).first();
        if (existingUser) {
            return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Insert user first
        const [user] = await pg('users')
            .insert({
                firstname,
                lastname,
                email,
                phone,
                password: hashedPassword,
                verification_code: verificationCode,
                is_verified: false
            })
            .returning(['id', 'firstname', 'lastname', 'email', 'phone', 'role', 'is_verified']);

        // Send verification email (non-blocking)
        if (process.env.SMTP_EMAIL && process.env.SMTP_PASS) {
            try {
                const emailResult = await transporter.sendMail({
                    from: `"Sakchha Careers" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: "Verify your email - Sakchha Careers",
                    text: `Your verification code is: ${verificationCode}`,
                    html: `<p>Your verification code is: <b>${verificationCode}</b></p>
                           <a href="${process.env.NEXT_PUBLIC_BASE_URL}/register/verify-email?email=${encodeURIComponent(email)}" style="display:inline-block;padding:10px 20px;background:#0070f3;color:#fff;text-decoration:none;border-radius:4px;">Verify Email</a>`,
                });

                if (!emailResult.accepted || !emailResult.accepted.includes(email)) {
                    console.error("Failed to send verification email, but user was created");
                }
            } catch (emailError) {
                console.error("Error sending email (user was created):", emailError);
            }
        }

        return NextResponse.json({ message: 'Registration successful, please verify your email.', email }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// UPDATE User Profile 
export async function PUT(request) {
    try {
        const formData = await request.formData();

        // Extract fields from formData
        const id = formData.get("id");
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const address = formData.get("address");
        const skills = formData.get("skills");
        const education = formData.get("education");
        const experience = formData.get("experience");
        const cvFile = formData.get("cv");

        if (!id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        // Prepare update object with only defined values
        const updateData = {};
        if (firstname !== null) updateData.firstname = firstname;
        if (lastname !== null) updateData.lastname = lastname;
        if (email !== null) updateData.email = email;
        if (phone !== null) updateData.phone = phone;
        if (address !== null) updateData.address = address;
        if (skills !== null) updateData.skills = skills;
        if (education !== null) updateData.education = education;
        if (experience !== null) updateData.experience = experience;

        // Handle CV upload 
        if (cvFile && cvFile.name) {
            updateData.cv_url = `/uploads/${cvFile.name}`;
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ message: "No fields to update" }, { status: 400 });
        }

        const [updatedUser] = await pg("users")
            .where({ id })
            .update(updateData)
            .returning([
                "id", "firstname", "lastname", "email", "phone", "address", "skills", "education", "experience", "cv_url"
            ]);

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // expose cv_path expected by client
        const responseUser = { ...updatedUser, cv_path: updatedUser.cv_url };

        return NextResponse.json({
            message: "Profile updated successfully",
            user: responseUser,
        });

    } catch (error) {
        console.error("Update profile error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}


