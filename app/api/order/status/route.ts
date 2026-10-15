import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const expectedToken = process.env.XENDIT_WEBHOOK_TOKEN
  const receivedToken = request.headers.get("x-callback-token")
  if (!expectedToken || receivedToken !== expectedToken) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const payload = await request.json() as {
    reference_id?: string
    status?: string
  }
  if (!payload.reference_id || !payload.status) {
    return Response.json({ success: false, error: "Invalid webhook payload" }, { status: 400 })
  }

  const status = payload.status.toUpperCase() === "SUCCEEDED"
    ? "success"
    : payload.status.toUpperCase() === "FAILED"
      ? "failed"
      : "pending"

  await prisma.order.updateMany({
    where: { code: payload.reference_id },
    data: { status },
  })

  return Response.json({ success: true })
}
