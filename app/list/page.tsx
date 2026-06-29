import SubmitForm from "@/components/SubmitForm";

export const metadata = { title: "List your event — Car Events Near Me" };

export default function ListPage() {
  return (
    <main className="detail">
      <h1 style={{ fontSize: 34, letterSpacing: "-1px", marginBottom: 8 }}>List your event</h1>
      <p className="desc" style={{ maxWidth: 620 }}>
        Free to list. Add your car show, meet, track day, auction or autojumble and reach
        enthusiasts across the UK. We review every submission before it goes live.
      </p>
      <div style={{ marginTop: 18 }}>
        <SubmitForm />
      </div>
    </main>
  );
}
