import { useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  Row,
  Container,
  Button,
  Alert,
  Col,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./css/app.css";
const App = () => {
  const [error, setError] = useState("");
  const [todo, setTodo] = useState("");
  const [alltodo, setAlltodo] = useState([]);
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [uid, setUid] = useState(uuidv4());
  const [isCreateTask, setIsCreateTask] = useState(false);

  const handleTodos = () => {
    if (todo == "") {
      setError("Please add todo first !!");
      setShow(true);
    } else {
      let todoObj = { id: uid, value: todo };
      setAlltodo([...alltodo, todoObj]);
      setIsCreateTask(false);
      setTodo("");
      setUid(uuidv4());
    }
  };

  const checkClicked = (e) => {
    if (e.target.checked == true) {
      setIsChecked([...isChecked, e.target.value]);
    } else {
      let checkedArr = [...isChecked];
      const arrIndex = checkedArr.indexOf(e.target.value);
      if (arrIndex > -1) {
        checkedArr.splice(arrIndex, 1);
        setIsChecked(checkedArr);
      }
    }
  };

  return (
    <div className="container">
      <Container>
        <Row className="task-title">
          {" "}
          <Col xs={12}>
            <h1>All Tasks</h1>
          </Col>
        </Row>
        <Row>
          {error != "" ? (
            <Alert variant="danger" onClose={() => setShow(false)}>
              <p>{error}</p>
            </Alert>
          ) : (
            ""
          )}
        </Row>
        {alltodo.length > 0 ? (
          <Row>
            <Col xs={12}>
              {alltodo.map((todoVal, index) => {
                console.log(isChecked[index]);
                return (
                  <Card
                    body
                    className={
                      isChecked.indexOf(todoVal.id) > -1 ? "card-checked" : ""
                    }
                    key={todoVal.id}
                  >
                    {todoVal.value}
                    <span className="checkbox round">
                      <input
                        type="checkbox"
                        id={"checkbox" + index}
                        onChange={checkClicked}
                        value={todoVal.id}
                        data-key={todoVal.id}
                        className="check-input"
                      />
                      <label htmlFor={"checkbox" + index}></label>
                    </span>
                  </Card>
                );
              })}
            </Col>
          </Row>
        ) : (
          <Row className="empty-task">
            <Col xs={12}>
              <p className="alert alert-warning"><b>No Tasks available..</b> Click on below button to add new tasks..!!</p>
            </Col>
          </Row>
        )}
        <Row className={!isCreateTask ? "create-task" : "hide-task"}>
          <Col sm={12} xs={12}>
            <Button className="add-task-btn" onClick={()=>setIsCreateTask(true)}>+</Button>
          </Col>
        </Row>
        <Row className={isCreateTask ? "create-task" : "hide-task"}>
          <Col sm={8} xs={8}>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                placeholder="Enter todo task.."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Col>
          <Col sm={4} xs={4}>
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => handleTodos()}
            >
              Add todo
            </Button>{" "}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default App;
