import { GraduationCap } from "lucide-react";
import ProductDetailLayout from "@/components/ProductDetailLayout";
import lmsDashboard from "@/assets/lms-dashboard.jpg";

const LMSPage = () => (
  <ProductDetailLayout
    name="LMS System"
    tagline="Learning Management Platform"
    description="A modern learning management system that empowers educators and engages students — from course creation to online exams, all in one unified platform."
    icon={<GraduationCap size={32} className="text-primary-foreground" />}
    color="from-accent to-accent/60"
    screenshots={[lmsDashboard]}
    screenshotAlts={["LMS Student Dashboard"]}
    features={[
      { title: "Course Management", description: "Create and organize courses with modules, lessons, and multimedia content effortlessly." },
      { title: "Student Dashboard", description: "Personalized dashboards showing enrolled courses, progress, grades, and upcoming deadlines." },
      { title: "Progress Tracking", description: "Detailed analytics on student engagement, completion rates, and performance trends." },
      { title: "Online Examinations", description: "Timed exams with auto-grading, proctoring support, and anti-cheat measures." },
      { title: "Assignment System", description: "Upload, submit, and grade assignments with rubric-based evaluation and feedback." },
      { title: "Communication Tools", description: "Built-in messaging, announcements, and discussion forums for instructor-student interaction." },
    ]}
    benefits={[
      { text: "Increase student engagement by 60% with interactive content delivery" },
      { text: "Save 90% of administrative time with automated grading and reporting" },
      { text: "Double course completion rates with progress tracking and reminders" },
      { text: "Support 5,000+ concurrent students during peak exam sessions" },
      { text: "Accessible on any device — desktop, tablet, or mobile" },
      { text: "SCORM-compliant for easy content migration" },
    ]}
  />
);

export default LMSPage;
