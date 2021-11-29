import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion/dist/es/index";

import s from "./Users.module.css";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import Modal from "../../components/modal/Modal";

export default function Users(props) {
  const [modalUser, setModalUser] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVersion, setModalVersion] = useState(null);

  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);

  return (
    <>
      <div className={s.Users}>
        <Navbar />
        <div className={s.content}>
          <div className={s.contentWrapper}>
            <Table
              open={open}
              setModalVersion={setModalVersion}
              setModalUser={setModalUser}
            />
          </div>
        </div>
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={null}
        >
          {isModalOpen && (
            <Modal
              version={modalVersion}
              modalOpen={isModalOpen}
              handleClose={close}
              user={modalUser}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
