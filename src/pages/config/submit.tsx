import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import classnames from 'classnames';
import toast, { Toaster } from 'react-hot-toast';
import * as htmlToImage from 'html-to-image';
import FormData from 'form-data';
import SubmitAnalysis from '@/components/SubmitAnalysis';
import SubmitSummary from '@/components/SubmitSummary';
import { Navbar } from '@/components/_global';
import { AdvancedParametersDialog, SubmitDialog } from '@/components/modals';
import { useParams } from '@/hooks/';
import api from '@/services/api';

async function getImage(id) {
  let image;
  await htmlToImage.toBlob(document.getElementById(id)).then((dataUrl) => {
    image = dataUrl;
  });
  return image;
}

function SubmitConfig() {
  const { submitProposal, handleChange, setParams, ...params } = useParams();
  const [dialog, setDialog] = useState<boolean>(false);
  const [advancedDialog, setAdvancedDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [advancedParams, setAdvancedParams] = useState<boolean>(false);
  const [analyticsDash, setAnalyticsDash] = useState<boolean>(false);
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (params.convictionGrowth === '') {
      setParams((previousParams) => ({
        ...previousParams,
        convictionGrowth: '5',
      }));
    }
  }, []);

  async function submitParams() {
    setLoading(true);
    const chosenParams = {
      title: params.title,
      overallStrategy: params.overallStrategy,
      tokenLockup: {
        strategy: params.tokenFreezeStrategy,
        openingPrice: Number(params.openingPrice),
        tokenFreeze: Number(params.tokenFreeze),
        tokenThaw: Number(params.tokenThaw),
      },
      augmentedBondingCurve: {
        strategy: params.ABCStrategy,
        openingPrice: params.openingPrice,
        commonsTribute: Number(params.commonsTribute) / 100,
        ragequitAmount: Number(params.ragequitAmount),
        initialBuy: params.initialBuy,
        entryTribute: Number(params.entryTribute) / 100,
        exitTribute: Number(params.exitTribute) / 100,
        reserveBalance: params.reserveBalance,
        stepList: params.stepList,
        zoomGraph: params.zoomGraph,
        virtualSupply: Number(params.virtualSupply),
        virtualBalance: Number(params.virtualBalance),
      },
      taoVoting: {
        strategy: params.taoStrategy,
        supportRequired: params.supportRequired,
        minimumQuorum: params.minimumQuorum,
        delegatedVotingPeriod: Number(params.delegatedVotingPeriod),
        quietEndingPeriod: Number(params.quietEndingPeriod),
        quietEndingExtension: Number(params.quietEndingExtension),
        executionDelay: Number(params.executionDelay),
        voteDuration: Number(params.voteDuration),
      },
      convictionVoting: {
        strategy: params.convictionStrategy,
        spendingLimit: Number(params.spendingLimit) / 100,
        minimumConviction: Number(params.minimumConviction) / 100,
        convictionGrowth: Number(params.convictionGrowth),
        votingPeriodDays: Number(params.convictionVotingPeriodDays),
      },
      advancedSettings: {
        strategy: params.advancedStrategy,
        commonPoolAmount: Number(params.commonPoolAmount),
        HNYLiquidity: Number(params.HNYLiquidity),
        gardenLiquidity: Number(params.gardenLiquidity),
        virtualSupply: Number(params.virtualSupply),
        virtualBalance: Number(params.virtualBalance),
        transferability: params.transferable,
        tokenName: params.tokenName,
        tokenSymbol: params.tokenSymbol,
        proposalDeposit: Number(params.proposalDeposit),
        challengeDeposit: Number(params.challengeDeposit),
        settlementPeriod: Number(params.settlementPeriod),
        minimumEffectiveSupply: Number(params.minimumEffectiveSupply) / 100,
        ragequitAmount: Number(params.ragequitAmount),
        initialBuy: Number(params.initialBuy),
      },
    };

    const tokenLockup = await getImage('freeze-thaw-chart');
    const abc = await getImage('abc-chart');
    const taoVoting = await getImage('tao-chart');
    const convictionVoting = await getImage('conviction-chart');

    const body = new FormData();
    body.append('body', JSON.stringify({ ...chosenParams }));
    body.append('tokenLockup', tokenLockup);
    body.append('abc', abc);
    body.append('taoVoting', taoVoting);
    body.append('convictionVoting', convictionVoting);

    api
      .post('/issue-generator/', body, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })
      .then((response) => {
        setUrl(response.data.url);
        setLoading(false);
        setDialog(true);
      })
      .catch(() => {
        setLoading(false);
        toast('Something went wrong!', {
          duration: 3000,
          position: 'bottom-center',
          style: {
            background: '#DEFB48',
          },
          className: 'font-inter font-bold',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
      });
  }

  return (
    <>
      <Head>
        <title>Review and Submit | Commons Dashboard</title>
      </Head>
      <SubmitDialog
        isOpen={dialog}
        loading={loading}
        url={url}
        handleClose={() => setDialog(false)}
      />
      <AdvancedParametersDialog
        isOpen={advancedDialog}
        handleClose={() => setAdvancedDialog(false)}
      />
      <div className="min-h-screen h-full bg-dash bg-cover">
        <Navbar>
          <button
            className="self-center flex ml-auto uppercase font-bj font-bold text-neon text-xs pt-6"
            onClick={() => setAnalyticsDash((previousState) => !previousState)}
          >
            {analyticsDash ? 'view parameters' : 'view analytics'}
          </button>
        </Navbar>
        <div className="flex justify-between items-center px-32 py-12">
          <Link href="/config/4">
            <div className="flex flex-1 font-bj text-sm text-neon-light cursor-pointer">
              Back
            </div>
          </Link>
          <h2 className="font-bj font-bold text-3xl text-neon-light text-center py-4">
            {analyticsDash ? 'Commons Analytics' : 'Configuration Summary'}
          </h2>
          <label
            htmlFor="toggleB"
            className={classnames('flex flex-1 justify-end items-center', {
              'cursor-pointer': !analyticsDash,
              'opacity-0': analyticsDash,
            })}
          >
            <div className="text-neon-light text-sm mr-3">
              Advanced Settings
            </div>
            <div className="squared-input relative">
              <input
                type="checkbox"
                id="toggleB"
                disabled={analyticsDash}
                className="sr-only"
                onChange={() => setAdvancedParams(!advancedParams)}
              />
              <div className="box block squared-input w-10 h-6" />
              <div className="dot absolute left-1 top-1 bg-gray-50 w-4 h-4 transition" />
            </div>
          </label>
        </div>
        <div
          className={classnames(
            'mx-auto bg-black pb-16',
            analyticsDash ? '' : 'max-w-screen-xl'
          )}
        >
          {analyticsDash ? (
            <SubmitAnalysis
              params={params}
              submitParams={submitParams}
              submitProposal={submitProposal}
            />
          ) : (
            <SubmitSummary
              params={params}
              handleChange={handleChange}
              advancedParams={advancedParams}
              setAdvancedDialog={setAdvancedDialog}
              submitParams={() => setAnalyticsDash(true)}
              submitProposal={submitProposal}
            />
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default SubmitConfig;
