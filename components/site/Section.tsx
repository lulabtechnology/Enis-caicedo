import { ReactNode } from "react";
import Container from "@/components/ui/Container";

export default function Section({
  kicker,
  title,
  desc,
  children
}: {
  kicker?: string;
  title: string;
  desc?: string;
  children?: ReactNode;
}) {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {kicker ? <p className="kicker">{kicker}</p> : null}
            <h2 className="h2 mt-3">{title}</h2>
            {desc ? <p className="p mt-4">{desc}</p> : null}
          </div>
          <div className="lg:col-span-7">{children}</div>
        </div>
      </Container>
    </section>
  );
}
