import { FormEvent, ReactNode, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Card,
  Typography,
  Box
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "../../../../theme";
import getVideoId from "get-video-id";

const Input = (props: { label: string; icon: ReactNode, onSearch: (value: string) => void }) => {
  const [value, setValue] = useState('')
  const getInput = (e: FormEvent) => {
    const target = e.target as HTMLInputElement  
    setValue(target.value)
  }
  return (
    <FormControl
      sx={{
        mb: 1,
        width: "100%",
        "& label.Mui-focused": {
          color: "white",
        },
        "& .Mui-focused:after": {
          borderBottom: "2px solid white",
        },
      }}
      variant="filled"
    >
      <InputLabel sx={{ color: "white" }} htmlFor="filled-adornment-password">
        {props.label}
      </InputLabel>
      <FilledInput
        id="link-input"
        type="url"
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="Get Link" edge="end" onClick={() => props.onSearch(value)}>
              {props.icon}
            </IconButton>
          </InputAdornment>
        }
        sx={{
          background: theme.palette.secondary.light,
          "& .MuiFilledInput-input": {
            color: "white",
          },
          "& .MuiInputBase-root-MuiFilledInput-root:before": {
            borderBottom: "1px solid white;",
          },
        }}
        disableUnderline={true}
        onInput={getInput}
      />
    </FormControl>
  );
};

// const sampleResp = {
//   kind: "youtube#searchResult",
//   etag: '"q5k97EMVGxODeKcDgp8gnMu79wM/gWwm8abtbKoWg-uMt7NUmwSLzbA"',
//   id: {
//     kind: "youtube#video",
//     videoId: "iVIjckwltkk",
//   },
//   snippet: {
//     publishedAt: "2014-02-25T18:22:56.000Z",
//     channelId: "UChl6CG-V7LgqhfwkvbHH67Q",
//     title: "Kids At The Zoo: Compilation",
//     description:
//       "In this funny animal video, tune in to see an awesome compilation of kids interacting with their favorite animals at the zoo. SUBSCRIBE TO PETSAMI: ...",
//     thumbnails: {
//       default: {
//         url: "https://i.ytimg.com/vi/iVIjckwltkk/default.jpg",
//         width: 120,
//         height: 90,
//       },
//       medium: {
//         url: "https://i.ytimg.com/vi/iVIjckwltkk/mqdefault.jpg",
//         width: 320,
//         height: 180,
//       },
//       high: {
//         url: "https://i.ytimg.com/vi/iVIjckwltkk/hqdefault.jpg",
//         width: 480,
//         height: 360,
//       },
//     },
//     channelTitle: "Kyoot Animals",
//     liveBroadcastContent: "none",
//   },
// };

type ResultType = {
  id: {
    videoId: string
  },
  snippet: {
    title: string
    description: string
    thumbnails: {
      medium: {
        url: string
      }
    }
  }
}

type ResultCompressed = {
  id: string,
  title: string,
  desc: string,
  img: string
}
const queryApi = async(query: string) => {
    const apiKey = process.env.REACT_APP_YOUTUBE_API
    const link = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=video&key=${apiKey}`
    return fetch(link).then(resp => resp.json()).then(data => {
      const resp = data.items as ResultType[]
      const results: ResultCompressed[] = resp.map((res) => {
        return {
          id: res.id.videoId,
          title: res.snippet.title,
          desc: res.snippet.description,
          img: res.snippet.thumbnails.medium.url
        }
      })

      return results
    })
}

const ResultBox = (props: {result: ResultCompressed, onSelect: (id: string) => void}) => {
  const res = props.result
    return (
        <Card className="result-box" onClick={() => props.onSelect(res.id)}>
            <div className="img" style={{
                backgroundImage: 'url('+res.img+')'
            }} />
            <div className="meta">
                <Typography variant="h3" className="m-title ellipsis">{res.title}</Typography>
                <Typography className="m-desc ellipsis">{res.desc}</Typography>
            </div>
        </Card>
    )
}

const EmptyBox = (props: {message: string}) => {
  return (
    <>
      <Box sx={{
        display: 'inline-flex',
        justifyContent: 'center',
        width: '100%',
        height: '220px',
        color: 'white'
      }}>
        <Typography>{props.message}</Typography>
      </Box>
    </>
  )
}

export default function ApiSource() {
    const [query, setQuery] = useState('')
    const [apiResults, loadResults] = useState<ResultCompressed[]>([])
    const [videoId, setVideoId] = useState<string | null>(null)

    const search = (value:string, searchType: 'url' | 'api' = 'api') => {
      if(searchType === 'api'){
        setQuery(value)
      } else {
        const { id } = getVideoId(value)
        setVideoId(id)
      }
    }

    useEffect(() => {
      if(query && query !== ''){
        queryApi(query).then(results => loadResults(results))
      }
    })

    const Preview = () => {
      if(videoId) {
        return (
          <iframe
          className="yt-frame"
          title="yt-src"
          height="220"
          src={"https://www.youtube.com/embed/"+videoId}
        ></iframe>
        )
      } else {
        return <EmptyBox message="Nothing to preview. Insert YouTube link above or try searching for a video." />
      }
    }

    return (
        <div className="api-selector">
          <div className="api-preview apc">
              <Input
                label="Enter YouTube Link"
                icon={<ArrowForwardIcon sx={{ color: "white" }} />}
                onSearch={(link) => search(link, 'url')}
              />
              <Preview />
          </div>
          <div className="api-search apc">
              <Input
                label="Search YouTube"
                icon={<SearchIcon sx={{ color: "white" }} />}
                onSearch={search}
              />
              <div className="result-area">
                {
                  apiResults.length ?
                  apiResults.map((res, index) => (<ResultBox key={index} result={res} onSelect={setVideoId} />))
                  : <EmptyBox message="No video results. Use the search box above to get started." />
                }
              </div>
          </div>
        </div>
    );
}
