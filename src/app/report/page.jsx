"use client";
import ExportReportButton from '@/components/Extras/ExportReportButton';
import ReportPDF from '@/components/ReportPDF';
import React, { useRef } from 'react'

const Report = () => {
  return (
    <div>
      <ExportReportButton/>
      <ReportPDF/>
    </div>
  )
}

export default Report
