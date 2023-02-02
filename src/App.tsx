import {
  Button,
  Flex,
  Input,
  Tab,
  Tabs,
  Text,
  useColorMode,
  TabList,
  TabPanels,
  TabPanel,
  Checkbox,
  IconButton,
  Divider,
  Grid,
} from "@chakra-ui/react";

import { ChangeEvent, useState } from "react";

import { DeleteIcon } from "@chakra-ui/icons";
import { useLocalStorage } from "./hooks/useLocalStorage";

interface tarea {
  text: string;
  isChecked: boolean;
  index: number;
}

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [newTask, setNewTask] = useState<string>("");
  const [persistedTasks, setPersistedTasks] = useLocalStorage<tarea[]>(
    "Tasks",
    []
  );

  const addTask = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newTask.length > 0) {
      setPersistedTasks((prevState) => [
        ...prevState,
        { text: newTask, isChecked: false, index: persistedTasks.length },
      ]);
      setNewTask("");
    }
  };
  const updateTask = (task: tarea, checked: boolean) => {
    let newTasks = [...persistedTasks];
    const i = newTasks.findIndex((tarea) => tarea.index === task.index);
    newTasks[i].isChecked = checked;
    setPersistedTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    let afterDeleteArray = [...persistedTasks];
    const i = afterDeleteArray.findIndex((tarea) => tarea.index === index);
    afterDeleteArray.splice(i, 1);
    setPersistedTasks(afterDeleteArray);
  };

  const TaskItem = (task: tarea, indice: number) => {
    return !task.isChecked ? (
      <Grid gridGap={5} position="relative" w="80%">
        <Checkbox
          onChange={(e) => {
            updateTask({ ...task }, e.target.checked);
          }}
          gridArea="2/1/2/2"
          size="lg"
          position="absolute"
          margin="5px"
          colorScheme="green"
          maxW="15px"
          isChecked={task.isChecked}
        />
        <Text
          fontFamily="Sans-serif"
          fontWeight="bold"
          position="relative"
          left="2rem"
          ml={5}
          gridArea="2/1/2/2"
          placeSelf="flex-start"
        >
          {" "}
          {task.text}{" "}
        </Text>
        <IconButton
          onClick={() => deleteTask(task.index)}
          aria-label="check task"
          position="relative"
          left="2rem"
          maxW="15px"
          gridArea="2/3/2/3"
          justifySelf="end"
          alignSelf="self-start"
          bg="red.600"
          icon={<DeleteIcon />}
        />
      </Grid>
    ) : (
      <Grid gridGap={5} position="relative" w="80%">
        <Checkbox
          gridArea="2/1/2/2"
          size="lg"
          position="absolute"
          margin="5px"
          colorScheme="green"
          maxW="15px"
          isChecked={task.isChecked}
        />
        <Text
          position="relative"
          left="2rem"
          ml={5}
          gridArea="2/1/2/2"
          placeSelf="flex-start"
        >
          {task.text}
        </Text>
        <IconButton
          onClick={() => deleteTask(task.index)}
          aria-label="check task"
          position="relative"
          left="2rem"
          maxW="15px"
          gridArea="2/3/2/3"
          justifySelf="end"
          alignSelf="self-start"
          bg="red.600"
          icon={<DeleteIcon />}
        />
      </Grid>
    );
  };

  return (
    <>
      <Flex w="100%" h="100vh">
        <Flex maxW="80%" w="80%" flexDir={"column"} ml="20%" mt="5%" mr="20%">
          <Button
            onClick={toggleColorMode}
            w="fit-content"
            position="relative"
            left="80%"
          >
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
          <Text fontWeight="700" fontSize="30" textDecoration="underline">
            Tasks to do!
          </Text>
          <form onSubmit={addTask} max-width={"80%"}>
            <Flex mr="2%" mt="3%">
              <Input
                value={newTask}
                onChange={(e) => {
                  setNewTask(e.target.value);
                }}
                w="70%"
                placeholder="Input a new task..."
              />
              <Button onClick={addTask} w="15%" ml="2%">
                Add
              </Button>
            </Flex>
          </form>
          <Tabs mt="3%" variant="line">
            <TabList w="70%">
              <Tab borderRadius="3px">Tasks</Tab>
              <Tab borderRadius="3px">Completed Tasks</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {persistedTasks.map((task) =>
                  !task.isChecked ? (
                    <>
                      <TaskItem key={task.index} {...task}></TaskItem>{" "}
                      <Divider padding="3" />
                    </>
                  ) : null
                )}
              </TabPanel>
              <TabPanel>
                {persistedTasks.map((task) =>
                  task.isChecked ? (
                    <>
                      <TaskItem key={task.index} {...task}></TaskItem>
                      <Divider padding="3" />
                    </>
                  ) : null
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
};

export default App;
