import { Bytes } from "@graphprotocol/graph-ts";
import { WithdrawalQueued, WithdrawalCompleted } from "../generated/DelegationManager/DelegationManager";
import {
  getWithdrawal,
} from "./utils";

export function handleQueueWithdrawal(event: WithdrawalQueued): void {
  let withdrawalRoot = event.params.withdrawalRoot;
  let staker = event.params.withdrawal.staker;
  let nonce = event.params.withdrawal.nonce;
  let startBlock = event.params.withdrawal.startBlock;
  let shares = event.params.withdrawal.shares;

  if (!withdrawalRoot.equals(Bytes.empty())) {
    let withdrawal = getWithdrawal(withdrawalRoot);

    withdrawal.staker = staker;
    withdrawal.nonce = nonce;
    withdrawal.startBlock = startBlock;
    withdrawal.shares = shares;
    withdrawal.completed = false;
    withdrawal.save();
  }
}

export function handleWithdrawalCompleted(event: WithdrawalCompleted): void {
  let withdrawalRoot = event.params.withdrawalRoot;

  if (!withdrawalRoot.equals(Bytes.empty())) {
    let withdrawal = getWithdrawal(withdrawalRoot);
    withdrawal.completed = true;
    withdrawal.save();
  }
}
