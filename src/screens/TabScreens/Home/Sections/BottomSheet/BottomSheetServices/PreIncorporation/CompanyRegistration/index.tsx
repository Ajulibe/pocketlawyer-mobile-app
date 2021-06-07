import { ROUTES } from "navigation/Routes";
import React from "react";
import { addMetadata } from "services/UploadDocsService";
import { BottomSheetProps } from "../../../BottomSheetUtils/BottomSheetProps";
import { showError, showSuccess } from "../../../BottomSheetUtils/FormHelpers";
import {
  loadingReducer,
  loadingInitialState,
  LoadingActionType,
} from "../../../BottomSheetUtils/LoadingReducer";
import PagerView from "react-native-pager-view";
import { CompReg } from "./CompReg";
import { DirectorsInfo } from "./DirectorsInfo";

export function CompanyRegistration(props: BottomSheetProps) {
  const { navigation, closeModal, service, lawyer, historyId } = props;
  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState
  );
  const [formData1, setFormData1] = React.useState<any>([]);
  const [formData2, setFormData2] = React.useState<any>([]);
  const ref = React.useRef<PagerView>(null);

  const change = () => {
    ref.current?.setPage(0);
  };

  //--> Submit From
  const submit = async (meta3: Array<any>) => {
    const formMeta = [...formData1, ...formData2, ...meta3];
    return;
    loadingDispatch({
      type: LoadingActionType.SHOW_WITH_CONTENT,
      payload: { content: "Submiting, please wait..." },
    });
    const submit = await addMetadata(formMeta);
    loadingDispatch({ type: LoadingActionType.HIDE });
    if (submit === 200) {
      //--> Redirect to checkout
      closeModal();
      showSuccess("Submitted Successfully");
      navigation.navigate(ROUTES.CHECKOUT_SCREEN, {
        service: service,
        lawyer: lawyer,
        historyId: historyId,
        amount: props.amount,
      });
    } else {
      showError("Error in your network connection, try again");
    }
  };

  return (
    <PagerView
      ref={ref}
      style={{ flex: 1 }}
      initialPage={0}
      showPageIndicator={true}
      pageMargin={0}
      scrollEnabled={true}
      orientation="horizontal"
    >
      <CompReg
        key="1"
        {...props}
        formTitle={"Company Registration"}
        subTitle={"Please fill the form with your proposed business details"}
        onSubmit={(meta) => {
          setFormData1(meta);
          ref.current?.setPage(1);
        }}
      />
      <DirectorsInfo
        key="2"
        {...props}
        formTitle={"Director’s Information"}
        subTitle={"Add a minimum of two people and a maximum of ten"}
        onSubmit={(meta) => {
          setFormData2(meta);
          ref.current?.setPage(2);
        }}
      />
      <CompReg
        key="3"
        {...props}
        formTitle={"Shareholder’s Information"}
        subTitle={"Add a minimum of two people and a maximum of thirty"}
        onSubmit={(meta) => {
          //--> Pass meta to submit because use state would take time to take effect
          submit(meta);
        }}
      />
    </PagerView>
  );
}
