"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

export default function LandingPage() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <main className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">Website Maintenance Tool</h1>
        <p className="text-xl mb-8 text-muted-foreground">
          Monitor, analyze, and optimize your website's performance with ease.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Uptime Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              Track your website's availability 24/7 and receive instant alerts
              on downtime.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              Analyze load times, server response, and other crucial performance
              indicators.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Security Checks</CardTitle>
            </CardHeader>
            <CardContent>
              Regular scans for vulnerabilities and SSL certificate monitoring
              to keep your site secure.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>SEO Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              Get insights on your site's SEO health and recommendations for
              improvement.
            </CardContent>
          </Card>
        </div>
        {isSignedIn ? (
          <div className="flex justify-center">
            <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="outline" onClick={handleLogout}>
              <Link href="/">Log Out</Link>
            </Button>
          </div>
          </div>
        ) : (
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </main>

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>&copy; 2024 Website Maintenance Tool. All rights reserved.</p>
      </footer>
    </div>
  );
}
