import { prisma } from "@/lib/db";

export async function POST(request) {
  const { eventId, processedFoodList } = await request.json();

  const existingFood = processedFoodList.filter(
    (ele) => typeof ele.id === "number"
  );
  const newFood = processedFoodList.filter((ele) => typeof ele.id === "string");

  const currentFoods = await prisma.food.findMany({
    where: {
      eventId: eventId
    },
    select: {
      id: true
    }
  })

  const processedIdList = processedFoodList.map((ele) => ele.id)
  const removedFood = currentFoods.filter((ele) => {
    return processedIdList.indexOf(ele.id) < 0 
  })

  removedFood.forEach(async (ele) => {
    await prisma.food.delete({
      where: {
        id: ele.id
      }
    })
  })

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
    const removedId = newFood.map(({ id, ...food }) => {
      return {
        name: food.name,
        order: food.order,
        eventId: eventId,
      };
    });

    await prisma.food.createMany({ data: removedId });
  }

  return new Response(JSON.stringify({ update: "success" }), {
    status: 200,
  });
}
