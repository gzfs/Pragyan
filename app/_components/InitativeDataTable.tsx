"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { initiativeData } from "../_data/Initiative";
import { useState } from "react";

export default function InitiativeDropdown({ dispCity }: { dispCity: string }) {
  const [selectedRows, setSelectedRows] = useState<
    {
      Project: string;
      City: string;
      Funding: number;
    }[]
  >();

  return (
    <Table className="text-xs w-full col-span-1 overflow-x-scroll">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          {Object.keys(initiativeData[0]).map((data) => {
            return <TableHead>{data}</TableHead>;
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {initiativeData
          .filter((dataVal) => {
            return dataVal.City === dispCity;
          })
          .map((dataVal, ival) => {
            return (
              <TableRow key={dataVal.Project + ival}>
                <DataRow
                  dataVal={dataVal}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                />
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

function DataRow({
  dataVal,
  setSelectedRows,
  selectedRows,
}: {
  dataVal: any;
  setSelectedRows: CallableFunction;
  selectedRows:
    | {
        Project: string;
        City: string;
        Funding: number;
      }[]
    | undefined;
}) {
  const [checkState, setCheckState] = useState(false);
  return (
    <>
      <TableCell>
        <input
          checked={checkState}
          type="checkbox"
          onChange={() => {
            setCheckState(!checkState);
            console.log(checkState);

            if (!checkState) {
              if (selectedRows) {
                setSelectedRows([...selectedRows, dataVal]);
              } else {
                setSelectedRows([dataVal]);
              }
            } else {
              setSelectedRows(
                selectedRows?.filter((data) => {
                  return data.Project !== dataVal.Project;
                })
              );
            }
          }}
        ></input>
      </TableCell>
      <>
        {Object.values(dataVal).map((data: any, ival) => {
          return <TableCell key={dataVal.Project + ival}>{data}</TableCell>;
        })}
      </>
    </>
  );
}
