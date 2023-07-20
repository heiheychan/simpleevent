"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import validator from "validator";
import { useRouter } from 'next/navigation'

import Button from "@/app/components/UI/Button";
import DatetimePicker from "@/app/components/UI/DatetimePicker";
import TextInput from "@/app/components/UI/TextInput";
import OneFood from "./components/oneFood";
import { defaultFoodList } from "@/lib/defaultFoodList";
import AddFoodButton from "./components/addFoodButton";
import FixedBanner from "../components/UI/FixedBanner";
import axios from "axios";

export default function CreateEvent() {
  const [foodList, setFoodList] = useState(defaultFoodList);
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  // Switching pages
  const [firstPage, setFirstPage] = useState(true);
  const switchPageHandler = () => {
    setFirstPage((old) => !old);
  };

  const [enteredName, setEnteredName] = useState("");
  const [enteredDatetime, setEnteredDatetime] = useState(new Date());
  const [enteredLocation, setEnteredLocation] = useState("");
  const [enteredNumGuest, setEnteredNumGuest] = useState("");

  const setEnteredDatetimeHandler = (e) => {
    setEnteredDatetime(e.target.value);
  };

  const setEnteredNameHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const setEnteredLocationHandler = (e) => {
    setEnteredLocation(e.target.value);
  };

  const setEnteredNumGuestHandler = (e) => {
    setEnteredNumGuest(e.target.value);
  };

  const setFoodListHandler = (e) => {
    const i = foodList.findIndex((ele) => ele.id === e.target.id);
    const copyFoodList = [...foodList];
    copyFoodList[i].name = e.target.value;
    setFoodList(copyFoodList);
  };

  const removeFoodHandler = (id) => {
    const i = foodList.findIndex((ele) => ele.id === id);
    const copyFoodList = [...foodList];
    copyFoodList.splice(i, 1);
    setFoodList(copyFoodList);
  };

  const handleOnDragEnd = (result) => {
    const draggedIndex = foodList.findIndex(
      (ele) => ele.id === result.draggableId
    );
    const copyFoodList = [...foodList];
    const draggedEle = copyFoodList.splice(draggedIndex, 1)[0];
    copyFoodList.splice(result.destination.index, 0, draggedEle);
    setFoodList(copyFoodList);
  };

  const addFoodHandler = () => {
    const newId = String(new Date().getTime());
    setFoodList((old) => {
      return [...old, { id: newId, order: 0, name: "" }];
    });
  };

  // ******Handle form submission******
  // **Validate inputs**
  // Validate food list
  const checkFoodListError = (fl) => {
    let valid = true;

    fl.forEach((ele) => {
      if (ele.name.length === 0) {
        valid = valid && false;
      }
    });

    return valid;
  };

  const validationSchema = [
    {
      valid: validator.isLength(enteredName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "Event name is invalid",
    },
    {
      valid: validator.isInt(enteredNumGuest, { min: 1, max: 100 }),
      errorMessage: "Number of Guest is invalid",
    },
    {
      valid: validator.isLength(enteredLocation, { min: 1, max: 100 }),
      errorMessage: "Location is invalid",
    },
    {
      valid: checkFoodListError(foodList),
      errorMessage: "Food list is invalid",
    },
  ];

  const processFoodList = (fl) => {
    const newfl = fl.map((ele, index) => {
      return { ...ele, order: index };
    });

    setFoodList(newfl);
  };

  const formSubmission = async () => {
    setErrors([]);
    let tempError = [];

    // Validate page 1 input
    validationSchema.forEach((check) => {
      if (!check.valid) {
        tempError.push(check.errorMessage);
        return;
      }
    });

    setErrors(tempError);

    if (tempError.length > 0) {
      return;
    }

    // Add order value to the food list
    processFoodList(foodList);

    const response = await axios.post("/api/event/createevent", {
      name: enteredName,
      eventdatetime: enteredDatetime,
      location: enteredLocation,
      numguest: enteredNumGuest,
      foodlist: [...foodList]
    })

    if (response.status === 200) {
      router.push("/dashboard");
    }
  };

  // Page 1 content
  const page1 = (
    <>
      <div className="w-full max-w-[400px]">
        <h1 className="text-2xl font-bold mb-3">Create an event</h1>
        <p className="text-gray-500">
          Please fill in your event info{" "}
          <span className="font-bold text-red-500">{"(all required)"}</span>
        </p>
      </div>
      <div className="w-full flex flex-col max-w-[400px] mt-6">
        <TextInput
          label="Event name*"
          placeholder="Amazin summer grill"
          type="text"
          value={enteredName}
          setValue={setEnteredNameHandler}
        />
        <DatetimePicker
          value={enteredDatetime}
          setValue={setEnteredDatetimeHandler}
        />
        <TextInput
          label="Location*"
          placeholder="Bill's backyard"
          type="text"
          value={enteredLocation}
          setValue={setEnteredLocationHandler}
        />
        <TextInput
          label="Max number of guests*"
          type="number"
          min="0"
          max="100"
          subtext="Between 1 to 100"
          placeholder={10}
          value={enteredNumGuest}
          setValue={setEnteredNumGuestHandler}
        />
        <Button
          content="Next: What to Bring?"
          onClickHandler={switchPageHandler}
          bgcolor="bg-red-500"
        />
      </div>
    </>
  );

  // Page 2
  const page2 = (
    <>
      {errors.length > 1 && (
        <FixedBanner messages={errors} color="bg-red-500" setMessages={setErrors}/>
      )}
      <div className="w-full max-w-[400px]">
        <h1 className="text-2xl font-bold mb-3">What to bring?</h1>
        <p className="text-gray-500">
          Please add the food you want your guests to bring
        </p>
      </div>
      <div className="w-full flex flex-col max-w-[400px] mt-6">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="foodList">
            {(provided) => (
              <section {...provided.droppableProps} ref={provided.innerRef}>
                {foodList.map((food, index) => (
                  <Draggable
                    key={food.id}
                    draggableId={food.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <OneFood
                        food={food.name}
                        id={food.id}
                        innerRef={provided.innerRef}
                        provided={provided}
                        setValue={setFoodListHandler}
                        removeValue={removeFoodHandler}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <AddFoodButton addFoodHandler={addFoodHandler} />
      <Button
        content="Create event"
        bgcolor="bg-red-500"
        onClickHandler={formSubmission}
      />
      <button onClick={switchPageHandler} className="mt-2 underline">
        Back
      </button>
    </>
  );

  if (firstPage === true) {
    return page1;
  } else {
    return page2;
  }
}
