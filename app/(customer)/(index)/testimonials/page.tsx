import Navbar from "../_components/navbar"

export default function TestimonialsPage() {
  return (
    <>
      <header className="bg-[#EFF3FA] pt-[30px] pb-[30px]">
        <Navbar />
      </header>
      <main className="container max-w-[1130px] mx-auto py-[100px]">
        <h1 className="font-bold text-4xl">Testimonials</h1>
        <p className="mt-4 text-[#6A7789]">Customer testimonials will appear here.</p>
      </main>
    </>
  )
}
