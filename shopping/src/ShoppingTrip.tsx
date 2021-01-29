import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { shops, items } from "./data";

interface Item {
  name: string;
  completed: boolean;
}

export function ShoppingTrip() {
  const [chosenShops, setChosenShops] = useState([] as string[]);
  const [chosenItems, setChosenItems] = useState([] as Item[]);
  const [editing, setEditing] = useState(true);

  return (
    <Stack maxWidth={300} marginX="auto">
      <HStack>
        <Text fontSize="lg"> Where to?</Text>
        {shops.map((s, i) => (
          <Checkbox
            isChecked={chosenShops.includes(s)}
            key={i}
            onChange={(e) =>
              e.target.checked
                ? setChosenShops((shops) => [...shops, s])
                : setChosenShops((shops) => shops.filter((shop) => shop !== s))
            }
          >
            {s}
          </Checkbox>
        ))}
      </HStack>
      <Flex justify="space-between">
        {" "}
        <Heading>{editing ? "Add Items" : "Items"}</Heading>
        <Button onClick={() => setEditing((e) => !e)}>
          {editing ? "Done" : "Edit"}
        </Button>
      </Flex>
      <Box borderBottom="1px solid gray">
        <ItemsOnList
          {...{ chosenItems, chosenShops, setChosenItems, editing }}
        />
      </Box>

      {editing && (
        <SuggestedItems {...{ chosenItems, chosenShops, setChosenItems }} />
      )}
    </Stack>
  );
}

function ItemsOnList(props: {
  chosenItems: Item[];
  chosenShops: string[];
  setChosenItems: Dispatch<SetStateAction<Item[]>>;
  editing: boolean;
}) {
  const itemsToShow = props.chosenItems;
  return (
    <Stack>
      {itemsToShow.map((item, i) =>
        props.editing ? (
          <EditableItem
            key={i}
            item={item}
            setChosenItems={props.setChosenItems}
          />
        ) : (
          <CompleteableItem
            key={i}
            item={item}
            setChosenItems={props.setChosenItems}
          />
        )
      )}
      {!props.editing && (
        <Button
          onClick={() =>
            props.setChosenItems((chosenItems) =>
              chosenItems.map((chosenItem) => ({
                ...chosenItem,
                completed: true,
              }))
            )
          }
        >
          Check all
        </Button>
      )}
    </Stack>
  );
}

function EditableItem(props: {
  item: Item;
  setChosenItems: Dispatch<SetStateAction<Item[]>>;
}) {
  return (
    <Flex justify={"space-between"}>
      <div>{props.item.name}</div>
      <Button
        onClick={() =>
          props.setChosenItems((items) =>
            items.filter((chosenItem) => chosenItem.name !== props.item.name)
          )
        }
      >
        remove
      </Button>
    </Flex>
  );
}

function CompleteableItem(props: {
  item: Item;
  setChosenItems: Dispatch<SetStateAction<Item[]>>;
}) {
  return (
    <Checkbox
      isChecked={props.item.completed}
      onChange={() => {
        props.setChosenItems((chosenItems) =>
          chosenItems.map((chosenItem) =>
            chosenItem.name === props.item.name
              ? { ...chosenItem, completed: !chosenItem.completed }
              : chosenItem
          )
        );
      }}
    >
      {props.item.name}
    </Checkbox>
  );
}

function SuggestedItems(props: {
  chosenItems: Item[];
  chosenShops: string[];
  setChosenItems: Dispatch<SetStateAction<Item[]>>;
}) {
  return (
    <Stack>
      {items
        .filter((item) =>
          item.shops.some(
            (s) =>
              props.chosenShops.includes(s) &&
              !props.chosenItems.some(
                (chosenItem) => chosenItem.name === item.name
              )
          )
        )
        .map((item, i) => (
          <Flex key={i} justify={"space-between"}>
            <div>{item.name}</div>
            <Button
              onClick={() =>
                props.setChosenItems((items) => [
                  ...items,
                  { name: item.name, completed: false },
                ])
              }
            >
              add
            </Button>
          </Flex>
        ))}
    </Stack>
  );
}
