import Link from "next/link";
import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    right: 0,
    top: 50,
    borderRadius: 15,
  },
});

export default function TopBarDropdown({
  pages,
  close,
}: {
  pages: {
    label: string;
    link: string;
  }[];
  close: () => void;
}) {
  const classes = useStyles(); // Styles for dropdown menu
  const router = useRouter();

  return (
    <Dialog
      classes={{
        paper: classes.dialog,
      }}
      open
      onClose={() => close()}
      sx={{
        "& .MuiDialog-container": {
          justifyContent: "flex-start",
          alignItems: "flex-start",
        },
      }}
    >
      <div className="flex flex-col px-8 py-4 gap-2">
        {pages.map((page, i) => {
          const pathRoute = `/${router.pathname.split("/")[1]}`;
          const onPage = page.link === pathRoute;
          return (
            <Link key={i} href={page.link}>
              <div
                className={`${
                  onPage ? "font-bold text-secondary-light" : "text-main-light"
                } button`}
              >
                {page.label}
              </div>
            </Link>
          );
        })}
      </div>
    </Dialog>
  );
}
