import WeeklyPlanner from "./components/WeeklyPlanner";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-8">
        <WeeklyPlanner />
      </div>
    </>
  );
}
