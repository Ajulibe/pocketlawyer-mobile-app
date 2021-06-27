import { ROUTES } from "navigation/Routes";
import React from "react";
import { addMetadata, submitHistory } from "services/UploadDocsService";
import { BottomSheetProps } from "../../../BottomSheetUtils/BottomSheetProps";
import { showError, showSuccess } from "../../../BottomSheetUtils/FormHelpers";
import {
  loadingReducer,
  loadingInitialState,
  LoadingActionType,
} from "../../../BottomSheetUtils/LoadingReducer";
import PagerView from "react-native-pager-view";
import { TrusteeRegistration } from "./TrusteeRegistration";
import { TrusteeMemberInfo } from "./TrusteeMemberInfo";

export function RegOfIncTrustees(props: BottomSheetProps) {
  const { navigation, closeModal, service, lawyer, historyId } = props;
  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState
  );
  const [formData1, setFormData1] = React.useState<any>([]);
  const ref = React.useRef<PagerView>(null);

  const change = (to: number) => {
    ref.current?.setPage(to);
  };

  //--> Submit From
  const submit = async (meta2: Array<any>) => {
    const formMeta = [...formData1, ...meta2];
    loadingDispatch({
      type: LoadingActionType.SHOW_WITH_CONTENT,
      payload: { content: "Submiting, please wait..." },
    });
    const submit = await addMetadata(formMeta);
    loadingDispatch({ type: LoadingActionType.HIDE });
    if (submit === 200) {
      //--> Submit Service
      try {
        const response = await submitHistory(props);
        if (response?.status === 200) {
          //--> Redirect to checkout
          closeModal();
          showSuccess("Submitted Successfully");
          const newProps = {
            ...props,
            serviceHistoryID: response?.data?.serviceHistoryID,
          };
          navigation.navigate(ROUTES.CHECKOUT_SCREEN, {
            ...newProps,
          });
        } else {
          showError("An error occured");
        }
      } catch (error) {
        showError(`Error occured: ${error}`);
      }
    } else {
      showError("Error in your network connection, try again");
    }
  };

  return (
    <PagerView
      ref={ref}
      style={{ flex: 1 }}
      initialPage={0}
      showPageIndicator={false}
      pageMargin={8}
      scrollEnabled={false}
      orientation="horizontal"
    >
      <TrusteeRegistration
        key="1"
        {...props}
        formTitle={"Incorporated Trustees Registration (1/2)"}
        subTitle={"Please fill the form with your proposed business details"}
        onSubmit={(meta) => {
          setFormData1(meta);
          change(1);
        }}
      />
      <TrusteeMemberInfo
        key="2"
        {...props}
        formTitle={"Trustee Member Information (2/2)"}
        subTitle={"Add a minimum of two people and a maximum of ten"}
        onSubmit={(meta) => {
          //--> Pass meta to submit because use state would take time to take effect
          submit(meta);
        }}
      />
    </PagerView>
  );
}
