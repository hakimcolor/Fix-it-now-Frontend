// import { getMe } from "@/services/getMe"

// export default function TechnicianProfiePage(){
//     const result= getMe();
//     console.log(result)
//     return(
//         <div>Techinian Profile (resul.id)</div>
//     )

// }







// import { getMe } from "@/services/getMe";
// import Image from "next/image";

// export default async function TechnicianProfilePage() {
//     const result = await getMe();

//     if (!result?.success || !result?.data?.profile) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-background">
//                 <div className="text-center p-8 bg-card border border-border rounded-2xl shadow-sm">
//                     <h2 className="text-xl font-semibold text-foreground">
//                         Failed to load profile
//                     </h2>
//                     <p className="text-muted-foreground mt-2">
//                         {result?.message || "Something went wrong"}
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     const { profile } = result.data;
//     const tech = profile.technicianProfile;

//     return (
//         <div className="min-h-screen bg-background py-10 px-4">
//             <div className="max-w-4xl mx-auto">
//                 {/* Header Card */}
//                 <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
//                     {/* Cover */}
//                     <div className="bg-gradient-to-r from-primary to-primary/80 h-32" />

//                     <div className="px-6 pb-6 -mt-16">
//                         <div className="flex flex-col sm:flex-row sm:items-end gap-6">
//                             {/* Profile Photo */}
//                             <div className="relative w-32 h-32">

//                                 <Image
//                                     src={tech.profilePhoto || "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
//                                     alt={profile.name}
//                                     fill
//                                      className="w-32 h-32 rounded-full border-4 border-card object-cover shadow-md bg-muted"
//                                     priority
//                                 />
//                                 {tech.isAvailable && (
//                                     <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-card rounded-full" />
//                                 )}
//                             </div>

//                             {/* Name + Info */}
//                             <div className="flex-1 pt-4 sm:pt-0">
//                                 <div className="flex flex-wrap items-center gap-3">
//                                     <h1 className="text-2xl font-bold text-foreground">
//                                         {profile.name}
//                                     </h1>

//                                     <span
//                                         className={`px-3 py-1 rounded-full text-xs font-medium ${profile.activeStatus === "ACTIVE"
//                                             ? "bg-green-500/15 text-green-600 dark:text-green-400"
//                                             : "bg-muted text-muted-foreground"
//                                             }`}
//                                     >
//                                         {profile.activeStatus}
//                                     </span>

//                                     {!tech.isApproved && (
//                                         <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/15 text-yellow-700 dark:text-yellow-400">
//                                             Pending Approval
//                                         </span>
//                                     )}
//                                 </div>

//                                 <p className="text-muted-foreground mt-1">{tech.profession}</p>
//                                 <p className="text-sm text-muted-foreground mt-1">
//                                     {tech.city}, {tech.district}
//                                 </p>
//                             </div>

//                             {/* Rate */}
//                             <div className="text-right">
//                                 <p className="text-sm text-muted-foreground">Hourly Rate</p>
//                                 <p className="text-2xl font-bold text-primary">
//                                     ${tech.hourlyRate}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//                     <StatCard label="Years Experience" value={tech.yearsOfExperience} />
//                     <StatCard label="Completed Jobs" value={tech.totalCompletedJobs} />
//                     <StatCard
//                         label="Avg. Rating"
//                         value={tech.averageRating.toFixed(1)}
//                     />
//                     <StatCard label="Total Reviews" value={tech.totalReviews} />
//                 </div>

//                 {/* Main Content */}
//                 <div className="grid md:grid-cols-3 gap-6 mt-6">
//                     {/* Left */}
//                     <div className="md:col-span-2 space-y-6">
//                         <Card title="About">
//                             <p className="text-foreground/90 leading-relaxed">{tech.bio}</p>
//                             {tech.description && (
//                                 <p className="text-muted-foreground mt-3 text-sm">
//                                     {tech.description}
//                                 </p>
//                             )}
//                         </Card>

//                         <Card title="Skills">
//                             <div className="flex flex-wrap gap-2">
//                                 {tech.skills?.split(",").map((skill: string) => (
//                                     <span
//                                         key={skill}
//                                         className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
//                                     >
//                                         {skill.trim()}
//                                     </span>
//                                 ))}
//                             </div>
//                         </Card>
//                     </div>

//                     {/* Right */}
//                     <div className="space-y-6">
//                         <Card title="Contact Information">
//                             <div className="space-y-3 text-sm">
//                                 <InfoRow label="Email" value={profile.email} />
//                                 <InfoRow label="Phone" value={profile.phone} />
//                                 <InfoRow label="Address" value={tech.address} />
//                                 <InfoRow
//                                     label="City"
//                                     value={`${tech.city}, ${tech.district}`}
//                                 />
//                             </div>
//                         </Card>

//                         <Card title="Availability">
//                             <div className="space-y-3 text-sm">
//                                 <InfoRow
//                                     label="Status"
//                                     value={
//                                         <span
//                                             className={
//                                                 tech.isAvailable
//                                                     ? "text-green-600 dark:text-green-400 font-medium"
//                                                     : "text-destructive font-medium"
//                                             }
//                                         >
//                                             {tech.isAvailable ? "Available" : "Not Available"}
//                                         </span>
//                                     }
//                                 />
//                                 <InfoRow
//                                     label="Response Time"
//                                     value={`${tech.responseTime} minutes`}
//                                 />
//                                 <InfoRow
//                                     label="Verified"
//                                     value={profile.isVerified ? "Yes" : "No"}
//                                 />
//                             </div>
//                         </Card>

//                         <Card title="Account">
//                             <div className="space-y-3 text-sm">
//                                 <InfoRow label="Role" value={profile.role} />
//                                 <InfoRow
//                                     label="Last Login"
//                                     value={new Date(profile.lastLoginAt).toLocaleString()}
//                                 />
//                                 <InfoRow
//                                     label="Joined"
//                                     value={new Date(profile.createdAt).toLocaleDateString()}
//                                 />
//                             </div>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// /* ---------- Helpers ---------- */

// function Card({
//     title,
//     children,
// }: {
//     title: string;
//     children: React.ReactNode;
// }) {
//     return (
//         <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
//             <h2 className="text-lg font-semibold text-foreground mb-4">{title}</h2>
//             {children}
//         </div>
//     );
// }

// function StatCard({
//     label,
//     value,
// }: {
//     label: string;
//     value: string | number;
// }) {
//     return (
//         <div className="bg-card border border-border rounded-xl shadow-sm p-5 text-center">
//             <p className="text-2xl font-bold text-foreground">{value}</p>
//             <p className="text-sm text-muted-foreground mt-1">{label}</p>
//         </div>
//     );
// }

// function InfoRow({
//     label,
//     value,
// }: {
//     label: string;
//     value: React.ReactNode;
// }) {
//     return (
//         <div className="flex justify-between gap-4">
//             <span className="text-muted-foreground">{label}</span>
//             <span className="text-foreground font-medium text-right">{value}</span>
//         </div>
//     );
// }

































import { getMe } from "@/services/getMe";
import Image from "next/image";
import Link from "next/link";

export default async function TechnicianProfilePage() {
    const result = await getMe();

    if (!result?.success || !result?.data?.profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center p-8 bg-card border border-border rounded-2xl shadow-sm">
                    <h2 className="text-xl font-semibold text-foreground">
                        Failed to load profile
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        {result?.message || "Something went wrong"}
                    </p>
                </div>
            </div>
        );
    }

    const { profile } = result.data;
    const tech = profile.technicianProfile;

    return (
        <div className="min-h-screen bg-background py-10 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Card */}
                <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                    {/* Cover */}
                    <div className="bg-gradient-to-r from-primary/80 to-primary/10 h-32" />

                    <div className="px-6 pb-6 -mt-16">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                            {/* Profile Photo */}
                            <div className="relative w-32 h-32">
                                <Image
                                    src={
                                        tech.profilePhoto ||
                                        "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    }
                                    alt={profile.name}
                                    fill
                                    className="w-32 h-32 rounded-full border-4 border-card object-cover shadow-md bg-muted"
                                    priority
                                />
                                {tech.isAvailable && (
                                    <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-card rounded-full" />
                                )}
                            </div>

                            {/* Name + Info */}
                            <div className="flex-1 pt-4 sm:pt-0">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-2xl font-bold text-foreground">
                                        {profile.name}
                                    </h1>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            profile.activeStatus === "ACTIVE"
                                                ? "bg-green-500/15 text-green-600 dark:text-green-400"
                                                : "bg-muted text-muted-foreground"
                                        }`}
                                    >
                                        {profile.activeStatus}
                                    </span>

                                    {!tech.isApproved && (
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/15 text-yellow-700 dark:text-yellow-400">
                                            Pending Approval
                                        </span>
                                    )}
                                </div>

                                <p className="text-muted-foreground mt-1">
                                    {tech.profession}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {tech.city}, {tech.district}
                                </p>
                            </div>

                            {/* Rate + Update Button */}
                            <div className="flex flex-col items-end gap-3">
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">
                                        Hourly Rate
                                    </p>
                                    <p className="text-2xl font-bold text-primary">
                                        ${tech.hourlyRate}
                                    </p>
                                </div>

                                <Link
                                    href="/technician-dashboard/profile/edit"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                        <path d="m15 5 4 4" />
                                    </svg>
                                    Update Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <StatCard
                        label="Years Experience"
                        value={tech.yearsOfExperience}
                    />
                    <StatCard
                        label="Completed Jobs"
                        value={tech.totalCompletedJobs}
                    />
                    <StatCard
                        label="Avg. Rating"
                        value={tech.averageRating.toFixed(1)}
                    />
                    <StatCard label="Total Reviews" value={tech.totalReviews} />
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    {/* Left */}
                    <div className="md:col-span-2 space-y-6">
                        <Card title="About">
                            <p className="text-foreground/90 leading-relaxed">
                                {tech.bio}
                            </p>
                            {tech.description && (
                                <p className="text-muted-foreground mt-3 text-sm">
                                    {tech.description}
                                </p>
                            )}
                        </Card>

                        <Card title="Skills">
                            <div className="flex flex-wrap gap-2">
                                {tech.skills?.split(",").map((skill: string) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                                    >
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right */}
                    <div className="space-y-6">
                        <Card title="Contact Information">
                            <div className="space-y-3 text-sm">
                                <InfoRow label="Email" value={profile.email} />
                                <InfoRow label="Phone" value={profile.phone} />
                                <InfoRow label="Address" value={tech.address} />
                                <InfoRow
                                    label="City"
                                    value={`${tech.city}, ${tech.district}`}
                                />
                            </div>
                        </Card>

                        <Card title="Availability">
                            <div className="space-y-3 text-sm">
                                <InfoRow
                                    label="Status"
                                    value={
                                        <span
                                            className={
                                                tech.isAvailable
                                                    ? "text-green-600 dark:text-green-400 font-medium"
                                                    : "text-destructive font-medium"
                                            }
                                        >
                                            {tech.isAvailable
                                                ? "Available"
                                                : "Not Available"}
                                        </span>
                                    }
                                />
                                <InfoRow
                                    label="Response Time"
                                    value={`${tech.responseTime} minutes`}
                                />
                                <InfoRow
                                    label="Verified"
                                    value={profile.isVerified ? "Yes" : "No"}
                                />
                            </div>
                        </Card>

                        <Card title="Account">
                            <div className="space-y-3 text-sm">
                                <InfoRow label="Role" value={profile.role} />
                                <InfoRow
                                    label="Last Login"
                                    value={new Date(
                                        profile.lastLoginAt
                                    ).toLocaleString()}
                                />
                                <InfoRow
                                    label="Joined"
                                    value={new Date(
                                        profile.createdAt
                                    ).toLocaleDateString()}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------- Helpers ---------- */

function Card({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
                {title}
            </h2>
            {children}
        </div>
    );
}

function StatCard({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="bg-card border border-border rounded-xl shadow-sm p-5 text-center">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
        </div>
    );
}

function InfoRow({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-foreground font-medium text-right">
                {value}
            </span>
        </div>
    );
}