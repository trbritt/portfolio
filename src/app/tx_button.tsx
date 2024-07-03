import { TransactionButton  } from "thirdweb/react";
import { contract } from "./client";
import { prepareContractCall } from "thirdweb";

export default function TXButtons() {
    return (
    <div>
        <TransactionButton
        transaction={() => prepareContractCall({
            contract: contract,
            method: "decrement"
        })}
        onTransactionSent={() => console.log("decrementing...")}
        onTransactionConfirmed={() => alert("Decremented")}
        >-</TransactionButton>

        <TransactionButton
        transaction={() => prepareContractCall({
            contract: contract,
            method: "increment"
        })}
        onTransactionSent={() => console.log("incrementing...")}
        onTransactionConfirmed={() => alert("Incremented")}
        >+</TransactionButton>
    </div>
    )
}