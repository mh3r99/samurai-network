import s from "./Dialogs.module.css";

import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/FormsControls/FormsControls";
import { maxLength100, required } from "../../utils/validators";

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem key={d.id} name={d.name} id={d.id} />
  ));
  let messagesElements = state.messages.map((m) => (
    <Message key={m.id} message={m.message} />
  ));

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

const AddMessageForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <Field
        name="newMessageBody"
        component={Textarea}
        placeholder="Enter your message"
        validate={[required, maxLength100]}
      ></Field>
    </div>
    <div>
      <button>Send</button>
    </div>
  </form>
);

const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(
  AddMessageForm
);

export default Dialogs;
