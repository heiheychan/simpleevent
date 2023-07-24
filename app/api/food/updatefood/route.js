import { prisma } from "@/lib/db";

export async function POST(request) {
  const { eventId, processedFoodList } = await request.json();


  const existingFood = processedFoodList.filter(
    (ele) => typeof ele.id === "number"
  );
  const newFood = processedFoodList.filter((ele) => typeof ele.id === "string");

  if (existingFood && existingFood.length > 0) {
    existingFood.forEach(async (food) => {
      await prisma.food.update({
        where: {
          id: food.id,
        },
        data: {
          name: food.name,
          order: food.order,
        },
      });
    });
  }

  if (newFood && newFood.length > 0) {
    const removedId = newFood.map(({id, ...food}) => food.eventId = eventId);

    await prisma.food.createMany({ data: removedId });
  }

  return new Response(JSON.stringify({ update: "success" }), {
    status: 200,
  });
}
