import DoughnutChart from "@/components/charts/DoughnutChart";
import Container from "@/fragments/Container";

export default function Home() {
  return (
    <Container>
      <div className=" w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>

      <div className="flex w-1/3 flex-col justify-center gap-5 rounded-2xl border p-6 pt-3 shadow-lg">
        <div>
          <h3 className="text-lg font-semibold">Sales Preview</h3>
        </div>
        <DoughnutChart />
      </div>
    </Container>
  );
}
